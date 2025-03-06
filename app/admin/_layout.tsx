import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Admin Dashboard',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="user-details" 
        options={{
          title: 'User Details',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}