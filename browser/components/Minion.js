import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateMinion, createMinion } from '../store/minions';
import Work from './Work';
import MinionDescription from './MinionDescription';
import MinionEdit from './MinionEdit';

const Minion = ({ newMinion }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const minion = useSelector((state) => state.minions.find((m) => m.id === id)) || {};
  const [editing, setEditing] = useState(newMinion);

  const [minionData, setMinionData] = useState(minion);

  useEffect(() => {
    setMinionData(minion);
  }, [minion]);

  const handleChange = useCallback(e => {
  setMinionData({ ...minionData,
    [e.target.name]: e.target.value
  });
});

  const toggleEdit = () => {
    if (editing) {
      if (newMinion) {
        dispatch(createMinion({ minion: minionData, navigate }));
      } else {
        dispatch(updateMinion(minionData));
      }
    }
    setEditing(!editing);
  };

  return (
    <div>
      <div id="single-minion-landing">
        <div className="minion-details">
          <div className="label meetings-label">
            {newMinion ? 'New Minion' : `Minion Id #${minionData.id}`}
          </div>
          <div className="minion-description">
            {editing ? (
              <MinionEdit handleChange={handleChange} {...minionData} />
            ) : (
              <MinionDescription {...minionData} />
            )}
          </div>
          <div className="button minion-save-button" onClick={toggleEdit}>
            {editing ? 'Save' : 'Edit'}
          </div>
        </div>
        <div className="work-details">
          <Work />
        </div>
      </div>
      <div className="button back-button">
        <button onClick={() => navigate('/minions')}>
          <img className="button" src="/img/arrow.svg" alt="Back" />
        </button>
      </div>
    </div>
  );
};

export default Minion;
