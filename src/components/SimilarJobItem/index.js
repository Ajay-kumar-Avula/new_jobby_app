import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobItems = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobdescription,
  } = jobDetails

  return (
    <li className="similar-job-item">
      <div className="logo-title-location-con">
        <div className="logo-title-con">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="title-rating-con">
            <h1 className='title-heading'>{title}</h1>
            <div className="rating-container">
              <BsStarFill className='rating-icon' />
              <p className='rating-heading'>{rating}</p>
            </div>
          </div>
        </div>
        <h1 className='description-heading'>Description</h1>
        <p className='description-text'>{jobdescription}</p>
        <div className="location-employee-con">
          <div className="location-container">
            <MdLocationOn className='location-icon' />
            <p className='location-heading'>{location}</p>
          </div>
          <div className="employee-type-container">
            <BsFillBriefcaseFill className='brief-case-icon' />
            <p className='employee-type-heading'>{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItems