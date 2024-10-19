import SearchIMDb from "../../../pages/SearchIMDb";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { IoMenuOutline, IoMoon } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
import { toggleTheme } from "../../../store/slices/themeSlice";

export default function Navbar() {
  let theme = useSelector((state) => state.theme.theme);
  console.log(theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fullNave mb-5 p-2   ${
          theme === "dark" ? "bg-black" : " bg-warning "
        }`}
        
        data-bs-theme={theme}
      >
        <div className="container-fluid ">
          <a
            className={`navbar-brand justify-content-spaceBetween p-0 ${theme === "dark" ? "" : "border border-1 border-black rounded-2"}`}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="https:upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
              alt="IMDb Logo"
              style={{ width: "70px" }}
            />
          </a>
          <button
            className="navbar-toggler bg-warning"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div 
            className="collapse navbar-collapse nav "
            id="navbarContent"
          >
            <ul  className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center mx-auto justify-content-lg-between w-100 ">
              <li className="nav-item text-decoration-none">
                <a
                  onClick={() => navigate("/menu")}
                  className={'nav-link mx-lg-3 d-flex align-items-center menu ps-0'}
                >
                  <IoMenuOutline className="fs-4" />
                  {t("Menu")}
                </a>
              </li>
              <li className="nav-item text-decoration-none ">
                <div className=" nav-link align-items-center d-lg-flex ">
                  <SearchIMDb  theme={theme}/>
                </div>
              </li>

              <li className="nav-item text-decoration-none d-flex justify-content-between width-100 d-lg-block">
                <a
                  className={'menu fs-6 nav-link  d-inline '}
                  onClick={() => navigate("/watchList")}
                >
                  {t("Watchlist")}
                </a>
                <a
                  className={'menu fs-6 nav-link  d-inline'}
                  onClick={() => navigate("/sign_in")}
                >
                  {t("Sign In")}
                </a>
                {/* <div className="navbar-language  d-inline"> */}
                <button
                  className={`btn  ${theme ==='dark' ? 'btn-outline-warning':'btn-dark' }`}
                  id="lang"
                  onClick={() => {
                    //change language
                    const button = document.getElementById("lang");
                    if (button.innerHTML == "EN") {
                      button.innerHTML = "AR";
                      i18n.changeLanguage("ar");
                      window.document.dir = i18n.dir("ar");
                      document.body.style.direction = "rtl";
                      // console.log(i18n.language);
                      
                    } else {
                      button.innerHTML = "EN";
                      i18n.changeLanguage("en");
                      window.document.dir = i18n.dir("en");
                      document.body.style.direction = "ltr";
                      // console.log(i18n.language);
                    }
                  }}
                >
                  EN
                </button>
              {/* </div> */}

              <div
                  className="mx-lg-2 hover fs-5  d-inline"
                  onClick={() => {
                    dispatch(toggleTheme());
                    console.log(theme);
                  }}
                >
                  {theme === "dark" ? (
                    <IoMoon
                      className={` ${
                        theme === "dark" ? "text-warning" : " text-black "
                      } `}
                    />
                  ) : (
                    <MdWbSunny
                      className={` ${
                        theme === "dark" ? "text-warning" : " text-black "
                      } `}
                    />
                  )}
                </div>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
