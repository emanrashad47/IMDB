import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import ButtonYellow from "../../component/ui/Button";
import { t } from "i18next";
import getCelebrities from "../../utils/people/celebrity/getCelebrities";
import Footer from "../../component/shared/layout/footer";
import Navbar from "../../component/shared/layout/Navbar";

export default function AllCelebrities() {
  const [celebrities, setcelebrities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularcelebrities = async () => {
      const celebrities = await getCelebrities();
      setcelebrities(celebrities);
      console.log(celebrities);
    };

    fetchPopularcelebrities();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mb-5">
        <div className="flex-container">
          <div className="line"></div>
          <div className="text">
            <h1 className="main-title fs-3">{t("Celebrities")}</h1>
          </div>
        </div>

        <div className="similar-card">
          {celebrities.map((celebrity) => {
            return (
              <div
                className="card bg-dark text-light m-2 hover"
                style={{ width: "90%" }}
                key={celebrity.id}
                onClick={() => navigate(`/celebrity/${celebrity.name}`)}
              >
                <div style={{ height: "80%" }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${celebrity.profile_path}`}
                    className="card-img-top"
                    alt={celebrity.title}
                  />
                </div>
                <div className="card-body mt-3">
                  <p>
                    <IoStarSharp
                      className="mb-1 me-1"
                      style={{ color: "#f5c618" }}
                    />{" "}
                    {celebrity.known_for[1].vote_average}
                  </p>
                  <h2 className="card-title title">{celebrity.name}</h2>
                </div>
              </div>
            );
          })}
        </div>
        <ButtonYellow />
      </div>
      <Footer />
    </>
  );
}
