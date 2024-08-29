import { SiInfosys } from "react-icons/si"; 
import { SiWipro } from "react-icons/si"; 
import { SiTata } from "react-icons/si"; 
import React from 'react';

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "TCS",
      location: "II, Magarpatta Rd, opp. Magarpatta City, Keshav Nagar, Pune",
      openPositions: 10,
      icon: <SiTata />,
    },
    {
      id: 2,
      title: "Wipro",
      location: "Doddakannelli, Sarjapur Road, Bengaluru",
      openPositions: 5,
      icon: <SiWipro />,
    },
    {
      id: 3,
      title: "Infosys",
      location: "Near Super Corridor, Super Corridor Rd Indore,",
      openPositions: 20,
      icon: <SiInfosys />,
    },
  ];
  return (
    <div className='companies'>
      <div className="container">
        <h3>Top Companies</h3>
        <div className="banner">
          {
            companies.map(element => {
              return(
                <div className="card" key={element.id}>
                  <div className="content">
                    <div className="icon">{element.icon}</div>
                    <div className="text">
                      <p>{element.title}</p>
                      <p>{element.location}</p>
                    </div>
                  </div>
                  <button>Open Position {element.openPositions}</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PopularCompanies
