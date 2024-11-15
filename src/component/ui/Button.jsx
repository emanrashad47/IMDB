import { t } from "i18next";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ButtonYellow() {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center p-2 mt-4 mb-5">
        <Button variant="warning" onClick={()=>navigate('/sign_in')}>{t('Sign in for more access')}</Button>
      </div>
  )
}
