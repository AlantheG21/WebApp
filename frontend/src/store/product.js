import { create } from "zustand";

/*
  Zustand `useProductStore` - global product store

  - Hook: useProductStore
    Import and call this hook in any component to read state or call actions.

  - State shape:
      products: Array   // list of product objects

  - Available actions:
      setProducts(products)  // replace the products array
      createProduct(newProduct) // async: validates, POSTs to /api/products, and appends on success

  Notes on the `create` initializer parameters:
  - `set` is provided by Zustand (no import required). Use it to update state.
      set({ key: value })               // shallow-merge a partial state object
      set(prev => ({ ...prev, key }))  // functional updater to avoid stale reads
  - You can also receive `get` and `api` by writing: create((set, get, api) => ...)
*/

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }), //shorthand for set({ products: products })
    createProduct: async (newProduct) => {
        // 1) Basic validation before making a network request
        //    Return early if required fields are missing so callers can show feedback.
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "All fields are required"};
        }

        // 2) POST to the backend API to create the product
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        
        const data = await res.json();

        // 3) Update local store on success
        // Use the functional `set` form to read the latest state safely (avoids race conditions):
        //   set(prev => ({ products: [...prev.products, data.data] }))
        // Here we use `state` as the parameter name (it could be `prev`, `s`, etc.) — it's provided by Zustand.
        if(res.ok) {
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created successfully" };
        } 
        else {
            // On failure, return an error message and do not mutate local state
            return { success: false, message: data.message || "Failed to create product" };
        }
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        if(res.ok) {
            set({ products: data.data });
        }
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();

        if(!data.success) {
            return { success: false, message: data.message };
        }

        // Updates ui immediately after successful deletion
        set((state) => ({
            products: state.products.filter((product) => product._id !== pid)
        }));
        return { success: true, message: data.message };
    },
    updateProduct: async (pid, updates) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updates),
        });

        const data = await res.json();
        if(!data.success) {
            return { success: false, message: data.message };
        }

        // Update local store with updated product data
        set((state) => ({
            products: state.products.map((product) => product._id === pid ? data.data : product)
        }));
        return { success: true, message: "Product updated successfully" };
    }
}));