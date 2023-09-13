import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  const [showDescription, setShowDescription] = useState({});

  const toggleDescription = (title) => {
    setShowDescription((prevShowDescription) => ({
      ...prevShowDescription,
      [title]: !prevShowDescription[title],
    }));
  };

  return (
    <>
      <h2 className="head-text">
        As a Data Scientist, <span>I Understand that,</span> <br /> Good Data Design{' '}
        <span>Is the Foundation of Good Business Insights.</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
            onClick={() => toggleDescription(about.title)}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            {showDescription[about.title] && (
              <p className="p-text" style={{ marginTop: 10 }}>
                {about.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(About, 'app__about'), 'about', 'app__whitebg');
