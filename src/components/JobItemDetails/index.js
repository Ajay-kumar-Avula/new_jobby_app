import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import { BsFillBriefcaseFill, BsStarFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { BiLinkExternal } from 'react-icons/bi';
import Header from '../Header';
import SimilarJobItems from '../SimilarJobItem';
import './index.css';

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const JobItemDetails = () => {
  const [jobsData, setJobsData] = useState({});
  const [similarJobsData, setSimilarJobsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConst.initial);

  const { id } = useParams();

  useEffect(() => {
    getJobData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobdescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  });

  const getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebSiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobdescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    skills: data.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    })),
  });

  const getJobData = async () => {
    setApiStatus(apiStatusConst.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const url = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const updateData = getFormattedData(data.job_details);
      const updateSimilarData = data.similar_jobs.map(each =>
        getFormattedSimilarData(each)
      );
      setJobsData(updateData);
      setSimilarJobsData(updateSimilarData);
      setApiStatus(apiStatusConst.success);
    } else {
      setApiStatus(apiStatusConst.failure);
    }
  };

  const renderFailureView = () => (
    <div className="job-item-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-img"
      />
      <h1 className="job-item-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="job-item-failure-description">We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={getJobData} className="job-item-failure-button">
        Retry
      </button>
    </div>
  );

  const renderLoadingView = () => (
    <div className="job-item-loader-container">
      <ClipLoader color="#ffffff" size={50} />
    </div>
  );

  const renderJobDetailsView = () => {
    const {
      companyLogoUrl,
      companyWebSiteUrl,
      employmentType,
      jobdescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobsData;

    const { description, imageUrl } = lifeAtCompany || {};

    return (
      <div className="job-details-view-container">
        <div className="job-item">
          <div className="logo-title-location-container">
            <div className="logo-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="title-heading">{title}</h1>
                <div className="rating-container">
                  <BsStarFill className="rating-icon" />
                  <p className="rating-heading">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-employee-container">
                <div className="location-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location-heading">{location}</p>
                </div>
                <div className="employee-type-container">
                  <BsFillBriefcaseFill className="brief-case-icon" />
                  <p className="employee-type-heading">{employmentType}</p>
                </div>
              </div>
              <p className="package-heading">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>
            <div className="visit-container">
              <a href={companyWebSiteUrl} className="visit-heading">
                Visit
              </a>
              <BiLinkExternal className="visit-icon" />
            </div>
          </div>
          <p className="description-text">{jobdescription}</p>
          <hr className="hr-line" />
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <li className="skills-item-container" key={eachSkill.name}>
                <div className="skills-container">
                  <img src={eachSkill.imageUrl} alt={eachSkill.name} className="skill-image" />
                  <p className="skill-name">{eachSkill.name}</p>
                </div>
              </li>
            ))}
          </ul>
          <hr className="hr-line" />
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description-image-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsData.map(eachjob => (
            <SimilarJobItems key={eachjob.id} jobDetails={eachjob} />
          ))}
        </ul>
      </div>
    );
  };

  const renderJobDetails = () => {
    switch (apiStatus) {
      case apiStatusConst.success:
        return renderJobDetailsView();
      case apiStatusConst.failure:
        return renderFailureView();
      case apiStatusConst.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="job-item-details-container">{renderJobDetails()}</div>
    </>
  );
};

export default JobItemDetails;





