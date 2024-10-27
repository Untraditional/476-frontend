import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Material UI components
import { TextField, Button, Box } from '@mui/material';

// Yup validation schema for adding drops
const DropSchema = Yup.object().shape({
  item: Yup.string().required('Item is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1'),
  monsterName: Yup.string().required('Monster name is required')  // Updated to validate monsterName
});

const AddDrop = () => {
  const initialValues = { item: '', quantity: '', monsterName: '' };

  return (
    <div>
      <h2>Add Drop</h2>
      <Formik
        initialValues={initialValues}  // Use initialValues as a constant
        validationSchema={DropSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            // API call to add the drop, using monsterName instead of monsterId
            const response = await axios.post('http://localhost:3000/api/drops', {
              item: values.item,
              quantity: parseInt(values.quantity),
              monsterName: values.monsterName,  // Send monsterName to the backend
            });
            alert(`Drop Added: ${response.data.item}`);
            
            // Explicitly reset the form to the initial values
            resetForm({ values: initialValues });
          } catch (error) {
            alert('Error adding drop');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Item field */}
              <Field
                as={TextField}
                label="Item"
                name="item"
                onChange={handleChange}
                error={touched.item && Boolean(errors.item)}
                helperText={touched.item && errors.item}
              />

              {/* Quantity field */}
              <Field
                as={TextField}
                label="Quantity"
                name="quantity"
                type="number"
                onChange={handleChange}
                error={touched.quantity && Boolean(errors.quantity)}
                helperText={touched.quantity && errors.quantity}
              />

              {/* Monster Name field (instead of Monster ID) */}
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
                Add Drop
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDrop;
