export default {
	user: {
		authenticated: false,
		role: null
	},
	login: function (context, creds, redirect) {
		var self = this;
		context.$http.post('api/auth/login', {
				email: creds.email,
				password: creds.password
			})
			.then(function (response) {
				localStorage.setItem('id_token', response.data.token)
				var im_info= { 
				  'xmpp_login': response.data.nickname,		
				  'xmpp_password': response.data.xmpp_password,
				  'full_name': response.data.full
				}
				localStorage.setItem('id_im', JSON.stringify(im_info));				

				self.user = {role:response.data.role};
				self.user.authenticated = true;
				location.reload();
				context.$router.go('-1');	
			})
			.catch(function(error) {
				console.log(error);
				context.error = error.body.error;
			});
	},
	signup: function (context, creds, redirect) {
		context.$http.post('api/auth/register', {
				email: creds.email,
				firstName: creds.firstName,
				lastName: creds.lastName,
				password: creds.password
			})
			.then(function (response) {
				if (response.data.success == true) {
					context.$router.push('/verify');				
				};
			})
			.catch(function(error) {
				context.error = error.body.data;
			});
	},
	forgot: function (context, creds, redirect) {
		context.$http.post('api/auth/reset', {
				email: creds.email
			})
			.then(function (response) {
				if (redirect) {
					this.$router.push('/');				
				};
			})
			.catch(function(error) {
				context.error = error.body.error;		
			});
	},
	reset: function (context, creds, redirect) {
		context.$http.post('api/auth/reset/' + creds.token + '', {
				password: creds.password
			})
			.then(function (response) {
				if (redirect) {
					this.$router.push('/login');				
				};
			})
			.catch(function(error) {
				if (error) {
					context.error = error.body.error;		
				}
			});
	},
	logout: function (context) {
		localStorage.removeItem('id_token')
		localStorage.removeItem('id_im')
		this.user.authenticated = false;
		context.$router.push('/');				
	},
	checkAuth: function () {
		var jwt = localStorage.getItem('id_token');
		var role = localStorage.getItem('user_role');
		if (jwt) {
			this.user.authenticated = true;
			this.user.role = role;
		} else {
			this.user.authenticated = false;
		}
	},
	getAuthHeader: function () {
		return {
			'Authorization': localStorage.getItem('id_token')
		}
	}
}
