class SessionDto {
    constructor(user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.user_level = user.role;
    }
}

module.exports = { SessionDto };