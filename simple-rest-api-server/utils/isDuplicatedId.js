const isDuplicatedId = (array, id) => array.map(item => item.id).includes(id);

// export default isDuplicatedId;
module.exports = isDuplicatedId;