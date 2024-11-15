import SearchIMDb from "../../../pages/SearchIMDb";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { IoMenuOutline, IoMoon } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
import { toggleTheme } from "../../../store/slices/themeSlice";
import { CiBookmarkPlus, CiMenuFries } from "react-icons/ci";

export default function Navbar() {
  let theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
            <svg id="home_img" class="ipc-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fill-rule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
          </a>
          <button
            className="navbar-toggler btn-outline-warning fs-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon visually-hidden"></span>
            <CiMenuFries />
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
                  <CiBookmarkPlus className="fs-3 bg-dark-subtle p-1 rounded-5"/>{t("Watchlist")}
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
                      
                    } else {
                      button.innerHTML = "EN";
                      i18n.changeLanguage("en");
                      window.document.dir = i18n.dir("en");
                      document.body.style.direction = "ltr";
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
