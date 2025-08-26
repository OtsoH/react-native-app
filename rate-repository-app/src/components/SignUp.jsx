import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as Yup from 'yup';
import Text from './Text';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

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
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.inputError
        ]}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        value={formik.values.username}
        placeholder="Username"
        placeholderTextColor="#aaa"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.inputError
        ]}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && styles.inputError
        ]}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
        value={formik.values.passwordConfirmation}
        placeholder="Password confirmation"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;