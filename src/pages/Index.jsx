import { Box, Button, Flex, FormControl, FormLabel, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [policies, setPolicies] = useState([]);
  const [newPolicy, setNewPolicy] = useState({ title: "", creationDate: "", expiryDate: "" });
  const toast = useToast();

  const handleAddPolicy = () => {
    if (!newPolicy.title || !newPolicy.creationDate || !newPolicy.expiryDate) {
      toast({
        title: "Error",
        description: "Please fill all fields before adding a policy.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setPolicies([...policies, newPolicy]);
    setNewPolicy({ title: "", creationDate: "", expiryDate: "" });
    toast({
      title: "Success",
      description: "Policy added successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeletePolicy = (index) => {
    const updatedPolicies = policies.filter((_, i) => i !== index);
    setPolicies(updatedPolicies);
    toast({
      title: "Deleted",
      description: "Policy removed successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Policy and SOP Management
        </Text>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input value={newPolicy.title} onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>Creation Date</FormLabel>
          <Input type="date" value={newPolicy.creationDate} onChange={(e) => setNewPolicy({ ...newPolicy, creationDate: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel>Expiry Date</FormLabel>
          <Input type="date" value={newPolicy.expiryDate} onChange={(e) => setNewPolicy({ ...newPolicy, expiryDate: e.target.value })} />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddPolicy}>
          Add Policy
        </Button>
      </VStack>

      <Box mt={8}>
        <Text fontSize="xl" fontWeight="bold">
          Policies List
        </Text>
        {policies.map((policy, index) => (
          <Flex key={index} justify="space-between" align="center" p={3} borderWidth="1px" borderRadius="lg" mt={2}>
            <Box>
              <Text fontWeight="bold">{policy.title}</Text>
              <Text>Creation Date: {policy.creationDate}</Text>
              <Text>Expiry Date: {policy.expiryDate}</Text>
            </Box>
            <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleDeletePolicy(index)}>
              Delete
            </Button>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default Index;
