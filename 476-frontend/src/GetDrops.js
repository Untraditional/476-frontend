import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Material UI components
import { TextField, Button, Box } from '@mui/material';

// Yup validation schema for fetching drops by monster name
const GetDropsSchema = Yup.object().shape({
  monsterName: Yup.string().required('Monster name is required'),  // Validate monsterName
});

const GetDrops = () => {
  const [drops, setDrops] = useState([]);
  const [error, setError] = useState('');

  return (
    <div>
      <h2>Get Drops by Monster Name</h2>
      <Formik
        initialValues={{ monsterName: '' }}  // Initial value is now monsterName
        validationSchema={GetDropsSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError('');
          try {
            // API call to get drops by monster name
            const response = await axios.get(`http://localhost:3000/api/drops/monster/${values.monsterName}`);
            setDrops(response.data);  // Update state with fetched drops
          } catch (error) {
            setError('Error fetching drops: ' + (error.response?.data?.error || error.message));  // Error handling
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Monster Name field */}
              <Field
                as={TextField}
                label="Monster Name"
                name="monsterName"
                onChange={handleChange}
                error={touched.monsterName && Boolean(errors.monsterName)}
                helperText={touched.monsterName && errors.monsterName}
              />

              {/* Submit button */}
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Get Drops
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      {/* Error message display */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Display the list of drops if available */}
      {drops.length > 0 && (
        <ul>
          {drops.map((drop) => (
            <li key={drop.id}>
              {drop.item} - Quantity: {drop.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetDrops;
