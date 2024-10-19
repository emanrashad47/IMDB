import{ useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Footer from '../../shared/layout/footer'
import { t } from 'i18next';
import Navbar from './Navbar';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepSignedIn: false
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };

  return (
    <>
    <Navbar />
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="text-center mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="IMDb Logo"
              style={{ width: '100px' }}
            />
            <h2>{t('Sign In')}</h2>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>{t('Email or mobile phone number')}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('Enter email or phone number')}
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
                placeholder={t('Password')}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="text-end">
                <a className="small">
                  {t('Forgot password?')}
                </a>
              </div>
            </Form.Group>

            <Button variant="warning" type="submit" className="w-100">{t('Sign In')}</Button>

            <Form.Group className="mt-3" controlId="formKeepSignedIn">
              <Form.Check
                type="checkbox"
                label={t('Keep me signed in')}
                name="keepSignedIn"
                checked={formData.keepSignedIn}
                onChange={handleChange}/>
              <Form.Text className="text-muted">
                <a href="#">{t('Details')}</a>
              </Form.Text>
            </Form.Group>

            <div className="text-center mt-3">
              <p>
                <a onClick={()=>navigate('/sign_up')} style={{color: 'blue', textDecoration: 'underLine', cursor:'pointer'}}>{t('Create your IMDb account')}</a>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    <Footer /> 
    </>
  );
}
