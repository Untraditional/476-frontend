import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Material UI components
import { TextField, Button, Box } from '@mui/material';

// Yup validation schema for monster creation
const MonsterSchema = Yup.object().shape({
  name: Yup.string().required('Monster name is required'),
  level: Yup.number()
    .required('Monster level is required')
    .min(1, 'Level must be greater than 0')
});

const CreateMonster = () => {
  return (
    <div>
      <h2>Create Monster</h2>
      <Formik
        initialValues={{ name: '', level: '' }}
        validationSchema={MonsterSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            // API call to create the monster
            const response = await axios.post('http://localhost:3000/api/monsters', {
              name: values.name,
              level: parseInt(values.level),
            });
            alert(`Monster Created: ${response.data.name}`);
            resetForm(); // Reset form after successful submission
          } catch (error) {
            alert('Error creating monster');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Name field */}
              <Field
                as={TextField}
                label="Monster Name"
                name="name"
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              {/* Level field */}
              <Field
                as={TextField}
                label="Monster Level"
                name="level"
                type="number"
                onChange={handleChange}
                error={touched.level && Boolean(errors.level)}
                helperText={touched.level && errors.level}
              />

              {/* Submit button */}
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Create Monster
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateMonster;
