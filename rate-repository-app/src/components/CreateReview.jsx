import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as Yup from 'yup';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';
import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    fontSize: 14,
    marginBottom: 15,
  },
});

const validationSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required('Repository owner name is required'),
  repositoryName: Yup.string()
    .required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: Yup.string(),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();
  const [reviewError, setReviewError] = useState('');

  const onSubmit = async (values) => {
    try {
      setReviewError('');
      const data = await createReview(values);
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
      if (e.message.includes('does not exists') || e.message.includes('does not exist')) {
        setReviewError('Repository not found. Please check the owner name and repository name.');
      } else if (e.message.includes('User has already reviewed this repository')) {
        setReviewError('You have already reviewed this repository.');
      } else {
        setReviewError('Failed to create review. Please try again.');
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },
    validationSchema,
    onSubmit,
  });

  const clearError = () => setReviewError('');

  return (
    <View style={styles.container}>
      {reviewError ? (
        <Text style={styles.errorText}>{reviewError}</Text>
      ) : null}
      <TextInput
        style={[
          styles.input,
          formik.touched.ownerName && formik.errors.ownerName && styles.inputError
        ]}
        onChangeText={formik.handleChange('ownerName')}
        onFocus={clearError}
        onBlur={formik.handleBlur('ownerName')}
        value={formik.values.ownerName}
        placeholder="Repository owner name"
        placeholderTextColor="#aaa"
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName && styles.inputError
        ]}
        onChangeText={formik.handleChange('repositoryName')}
        onFocus={clearError}
        onBlur={formik.handleBlur('repositoryName')}
        value={formik.values.repositoryName}
        placeholder="Repository name"
        placeholderTextColor="#aaa"
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && styles.inputError
        ]}
        onChangeText={formik.handleChange('rating')}
        onFocus={clearError}
        onBlur={formik.handleBlur('rating')}
        value={formik.values.rating}
        placeholder="Rating between 0 and 100"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          styles.textArea,
          formik.touched.text && formik.errors.text && styles.inputError
        ]}
        onChangeText={formik.handleChange('text')}
        onFocus={clearError}
        onBlur={formik.handleBlur('text')}
        value={formik.values.text}
        placeholder="Review"
        placeholderTextColor="#aaa"
        multiline
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.errorText}>{formik.errors.text}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;