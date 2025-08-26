import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { View, TextInput, Pressable, Text } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      const SignInContainer = ({ onSubmit }) => {
        const formik = useFormik({
          initialValues: { username: '', password: '' },
          validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
          }),
          onSubmit,
        });

        return (
          <View>
            <TextInput
              placeholder="Username"
              testID="usernameField"
              onChangeText={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              value={formik.values.username}
            />
            <TextInput
              placeholder="Password"
              testID="passwordField"
              secureTextEntry
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
            />
            <Pressable onPress={formik.handleSubmit} testID="submitButton">
              <Text>Submit</Text>
            </Pressable>
          </View>
        );
      };

      render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByTestId('usernameField'), 'kalle');
      fireEvent.changeText(screen.getByTestId('passwordField'), 'password');
      fireEvent.press(screen.getByTestId('submitButton'));

      await waitFor(() => {
        const firstCallFirstArgument = onSubmit.mock.calls[0][0];
        expect(firstCallFirstArgument).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});