import { Box, Container, Heading, VStack, useColorModeValue, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product.js";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct);
    console.log("Success:", success);
    console.log("Message:", message);
  };

  return (
    /*
      Container component to center content
      maxW: container.sm for small container width
    */
    <Container maxW={"container.sm"}>
      {/*
        VStack component to vertically stack elements
        spacing: 8 for consistent spacing between elements
      */}
      <VStack spacing={8}>

        {/*
          Heading component for the page title
          as: h1 for semantic HTML
          size: 2xl for extra large text
          mb: margin bottom of 8
        */}
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"} bg={useColorModeValue("white", "gray.800")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4}>
            {/* 
              Input for Product Name
              placeholder: placeholder text
              name: name attribute for the input
              value: controlled input value from newProduct state
              onChange: update newProduct state on input change
            */}
            <Input
              placeholder="Product Name"
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} // ... spread operator to keep other fields unchanged
            />
            <Input
              placeholder="Price"
              name='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} // ... spread operator to keep other fields unchanged
            />
            <Input
              placeholder="Image URL"
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} // ... spread operator to keep other fields unchanged
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>

        </Box>

      </VStack>
    </Container>
  )
};

export default CreatePage