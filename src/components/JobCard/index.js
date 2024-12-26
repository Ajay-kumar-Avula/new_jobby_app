import {Link} from 'react-router-dom'
import { BsFillBriefcaseFill, BsStarFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';


import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    id,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobData
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item" key={id}>
        <div className="logo-title-location-container">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              className="company-logo-url"
              alt="company logo"
            />
            <div className="title-rating-container">
              <p className="title-heading">{title}</p>
              <div className="rating-container">
                <BsStarFill className="star-icon-style" />
                <p className="rating-heading">{rating}</p>
              </div>
            </div>
          </div>
          
         
        </div>
        <div className="location-type-salary-con">
          <div className="location-type">
            <p className="location-heading"> <MdLocationOn/>{location}</p>
            <p className="employment-type-heading"><BsFillBriefcaseFill/>{employmentType}</p>
          </div>
          <div> 
             <p className="package-heading">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="hr-line" />
        <h1 className="description-heading">Description</h1>
        <p className="description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
