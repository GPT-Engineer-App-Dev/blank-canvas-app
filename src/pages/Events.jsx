import React, { useState } from 'react';
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase/index.js';

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '' });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: '', date: '', description: '' });
  };

  const handleUpdateEvent = (event) => {
    updateEvent.mutate(event);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading events</Text>;

  return (
    <Box bg="white" minH="100vh">
      <Flex as="nav" bg="gray.100" w="100%" p={4} justifyContent="center" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold">Events</Text>
      </Flex>
      <Container centerContent maxW="container.md" py={10}>
        <VStack spacing={4} w="100%">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={newEvent.name} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input name="date" value={newEvent.date} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={newEvent.description} onChange={handleInputChange} />
          </FormControl>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </VStack>
        <VStack spacing={4} w="100%" mt={10}>
          {events.map((event) => (
            <Box key={event.id} p={4} borderWidth="1px" borderRadius="md" w="100%">
              {editingEvent === event.id ? (
                <>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={event.name}
                      onChange={(e) => setEditingEvent({ ...event, name: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Date</FormLabel>
                    <Input
                      name="date"
                      value={event.date}
                      onChange={(e) => setEditingEvent({ ...event, date: e.target.value })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      name="description"
                      value={event.description}
                      onChange={(e) => setEditingEvent({ ...event, description: e.target.value })}
                    />
                  </FormControl>
                  <Button onClick={() => handleUpdateEvent(event)}>Update Event</Button>
                </>
              ) : (
                <>
                  <Text fontSize="lg" fontWeight="bold">{event.name}</Text>
                  <Text>{event.date}</Text>
                  <Text>{event.description}</Text>
                  <Button onClick={() => setEditingEvent(event.id)}>Edit</Button>
                  <Button onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                </>
              )}
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Events;