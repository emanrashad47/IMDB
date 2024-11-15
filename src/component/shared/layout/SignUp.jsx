import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'; 
import Footer from '../../shared/layout/footer'
import {t} from 'i18next'
import Navbar from './Navbar';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (e) => {setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage(t('Passwords do not match'));
    } else if (formData.password.length < 8) {
      setErrorMessage(t('Password must be at least 8 characters'));
    } else {
      setErrorMessage(''); 
      console.log('Form submitted', formData);
    }
  };

  return (
    <>
    <Navbar/>
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="text-center mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="IMDb Logo"
              style={{ width: '100px' }}/>
            <h2>{t('Create Account')}</h2>
          </div>

          {errorMessage && (
            <Alert variant="danger">
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>{t('Your name')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('Your name')}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>{t('Email')}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('Email')}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>{t('Password')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t("At least 8 characters")}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}/>
              <Form.Text className='text-danger small'>
                {t('Passwords must be at least 8 characters.')}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>{t('Re-enter password')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('Re-enter password')}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Button variant="warning" type="submit" className="w-100">
             {t('Create your IMDb account')}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              {t('Already have an account')}? <a onClick={()=>navigate('/sign_in')} style={{color: 'blue', textDecoration: 'underLine', cursor:'pointer'}}>{t('Sign In')}</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
    <Footer />
    </>
  );
}
