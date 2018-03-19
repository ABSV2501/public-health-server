module.exports = (database, DataTypes) => {
    return database.define("users", {
        user_id: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        isVerified: {
            type: DataTypes.BOOLEAN,
            default: true
        }
    })
};