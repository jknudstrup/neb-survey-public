<template>
	<div class="login-modal center container slightpurple">
		<div class="container parent white">
			<h3 class="bold neblue">Log In</h3>
			<h6 class="neg-txt">You must be logged in to do that!</h6>
			
			<form class="row" 
				@submit.prevent="submitCredentials(username, pass)">

					<div class="input-field col s6">
						<i class="material-icons prefix">account_circle</i>
	          <input id="username" v-model="username"
	          type="text" class="validate" required>
	          <label for="username">User ID</label>
	          <span class="helper-text" data-success=""
	          data-error="Please enter a valid username."></span>
	        </div>

	        <div class="input-field col s6">
	        	<i class="material-icons prefix">lock</i>
	          <input id="password" v-model="pass" 
	          type="password" class="validate" required>
	          <label for="password">Password</label>
	          <span class="helper-text" data-success=""
	          data-error="Please enter a valid password."></span>
	        </div>
	        <div class="fail-container" v-if="loginFailed">
	        	<span class="failure">Invalid username or password!</span>
	        </div>

	        <button class="btn btn-login row"
	        type="submit" name="action"> 
	        	 &emsp; Submit &emsp;
				  </button>

			</form>
		</div>
	</div>
</template>

<script>
	import firebase from 'firebase'
	import alias from './alias/name.json'
	export default {
		name: 'Login',
	data() {
			return {
				name: alias,
				user: null,
				username: null,
				pass: null,
				loginFailed: false
			}
		},
		methods: {
			test(param="Testing") {
				console.log(param)
			},
			show (dataObj=null) {
		    this.$modal.show('login', dataObj);
		  },
		  hide (modalName=null) {
		    this.$modal.hide('login');
		  },
		  beforeOpen(event) {
		  	return null
		  },
			logIn() {
				return null
			},
			logOut() {
				firebase.auth().signOut().then(() => M.toast({html: 'Logged Out!'}))
			},
			submitCredentials(username=null, password=null) {
				// Make it so 'admin' will work as a login
				const user = this.name[username]
				if (!user) {
					this.loginFailed = true
					return null
				}

				firebase.auth().signInWithEmailAndPassword(user, password)
					.then(this.loginSuccess)
					.catch(err => this.loginFailed = true)
			},
			loginSuccess(userCred=null) {
				if (userCred) {
					this.loginFailed = false
					M.toast({html: 'Logged In!'})
					this.$router.go(-1)
				}
			}
		},
		created () {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					this.user = 'admin'
				}
				else {
					this.user = null
				}
			})
		},
		mounted() {
			M.AutoInit();
		}
	}
</script>

<style scoped>
	.login-block {
		display: block;
		position: relative;
		width: 7rem;
	}
	.welcome {
		width: 100%;
		font-size: .7rem;
		position: absolute;
		top: -1.5rem;
	}
	.btn.login {
		position: absolute;
		top: 1.3rem;
		width: 100%;
		background-color: 
	}
	.navbar {
		background-color: #3f4cec !important;
	}
	.input-field {
		margin-bottom: 0;
	}
	.fail-container {
		margin-bottom: 1rem;
	}
	.failure {
		color: red;
	}
	.logo {
		vertical-align: middle;
		margin: 0 1rem .3rem 1rem;
	}
	h6 {
		margin-top: 0;
	}
</style>





