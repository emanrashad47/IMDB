import './footer.css';  
import { FaInstagram, FaLinkedinIn, FaUpwork } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6"; 
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { t } from 'i18next';

export default function Footer () {
  let theme = useSelector(state => state.theme.theme);
  return (
    <footer className={`footer ${theme ==='dark' ? 'bg-black text-white': ' bg-warning-subtle text-black'}`}>
      <hr />
      <h3 className="contact">{t('Contact') } <span className="color">{t('Us')} ↓</span></h3>

      <ul className="footer-list">
        <li>
          <p className='fontSize'>
            <BiLogoGmail className='fs-5 mx-2 ' style={{color: '#ffc107' }}/> aljabalymarah@gmail0com
          </p>

          <a href="https://github.com/marah-aljabaly" 
          className='footer-link d-block mb-2 text-warning fontSize'
          target='_blank'>
            <FaGithub className='fs-5 mx-2 ' style={{color: '#ffc107'}}/> Marah Aljabaly
          </a>
          <p className='fontSize'><FaPhoneVolume className='fs-5 mx-2' style={{color: '#ffc107'}}/> 0593213030</p>
          <a href="https://www.instagram.com/marah.aljabaly?igsh=dG9kanlnem0zN3ll" className="footer-link text-warning fontSize" target="_blank" rel="noopener noreferrer">
          <FaInstagram className='fs-5 mx-2 mb-2' style={{color: '#ffc107'}}/> Marah Aljabaly
          </a>
        </li>

        <li>
          <p className='fontSize'>
            <BiLogoGmail className='fs-5 mx-2' style={{color: '#ffc107'}}/> iamybatish@gmail.com</p>
            <p>
              <a href="https://www.linkedin.com/in/em-ba-a40703317/" className=' text-warning fs-5 mx-2 mb-2'
                ><FaLinkedinIn /></a>
              <a href="https://www.upwork.com/freelancers/~011e7fce99b39539cf?mp_source=share" className='text-warning fs-5 mx-2 mb-2' 
              ><FaUpwork /></a>
            </p>
          {/* <p className='fontSize'><FaLinkedinIn className='fs-5 mx-2 mb-2' style={{color: '#ffc107'}}/> </p> */}
          <a href="https://www.instagram.com/emanbattsh?igsh=MW1iMmwzeXY1MWwzNg==" className="footer-link text-warning fontSize" target="_blank" rel="noopener noreferrer">
          <FaInstagram className='fs-5 mx-2 mb-2' style={{color: '#ffc107'}}/> Eman Albattsh
          </a>
        </li>

        <li>
          <p className='fontSize'><BiLogoGmail className='fs-5 mx-2 mb-2' style={{color: '#ffc107'}}/> farahkhelsourani@gmail.com</p>
          <p className='fontSize'><FaPhoneVolume className='fs-5 mx-2 mb-2' style={{color: '#ffc107'}}/> 0592100123</p>
          <a href="https://www.instagram.com/farahelsourani?igsh=MW50dzYwcG13cnE3dw%3D%3D&utm_source=qr" className="footer-link text-warning fontSize" target="_blank" rel="noopener noreferrer">
          <FaInstagram className='fs-5 mx-2 mb-2' style={{color: '#ffc107'}}/> Farah El Sourani
          </a>
        </li>
      </ul>

      <p className="c">©️ IMDb website | by Marah & Eman & Farah as graduated project from WorkNet Company. </p>
    </footer>
  );
};


