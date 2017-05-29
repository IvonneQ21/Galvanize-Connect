import firebase from 'firebase';

export const updateSkillsAndSendToDB = (userData, skill) => {
  const userName = userData.name;
  addSkillToFireBase(userName, skill);
  return skill;
};
//pertaing to Update skill
export const updateSkillOnFireBase = (userName, skill, skillId) => {
  const skillInFB = firebase.database().ref(`users/${userName}/skills/${skillId}`);
  skillInFB.update(skill);
  return skill;
};

export const addSkillToFireBase = (userName, skill) => {
  const userSkillsInFireBase = firebase.database().ref(`users/${userName}/skills`).push();
  userSkillsInFireBase.set(skill);
};

// Action creators
export const addSkill = (userData, skill) => ({
  type: 'ADD_SKILL',
  payload: updateSkillsAndSendToDB(userData, skill),
});
//pertaining to update Skill
export const updataSkill = (userData, skill) => ({
  type: 'UPDATE_SKILL',
  payload: updateSkillOnFireBase(userData, skill),
});
