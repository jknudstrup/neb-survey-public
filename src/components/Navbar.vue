<template>
	<div class="navbar-fixed">

		<!-- Login Modal -->
		<modal name="login"
			height="auto" :scrollable='true' :adaptive='true' :resizable='true'>
			<div class="container">
				<div class="login-modal middle center-align row">
					<div class="col s12">
						<div>
							<h3 class="bold neblue center-align">Log In</h3>
						</div>
					</div>

					<form class="row" 
					@submit.prevent="submitCredentials(username, pass)">
			
						<div class="input-field col s12 m6">
							<i class="material-icons prefix">account_circle</i>
					    <input id="username" v-model="username"
					    type="text" class="validate" required>
					    <label for="username">User ID</label>
					    <span class="helper-text" data-success=""
					    data-error="Please enter a valid username."></span>
					  </div>

					  <div class="input-field col s12 m6">
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

					  <div class="col s12">
					  	<div class="">
						    <button class="btn btn-login" 
						     type="submit" name="action">
						     &emsp; Submit &emsp;
								</button>
							</div>
						</div>

					</form>

				</div>
			</div>
		</modal>

		<!-- Navbar -->
		<nav  class="navbar">
			<div class="nav-wrapper container">

				<!-- Logo -->
				<div class="brand-logo left waves-effect">
					<router-link :to="{name: 'Index'}">
						<img class="logo responsive-img" src="@/assets/neblogo.svg">
					</router-link>
				</div>

				<!-- Navbar Links -->
				<ul class='right'>

					<li class="waves-effect">
						<router-link :to="{name: 'Options'}" class="tooltipped" 
						data-position="left" data-tooltip="Edit Questions">
							<i class="material-icons">settings</i>
						</router-link>
					</li>

					<!-- Login Block -->
					<li>
							<div v-if="user">
								<div class="login-block">
									<div class="welcome">Hello, 
										<span class="amber-text">admin!</span>
									</div>
									<div class="btn login" @click="logOut">
										Log Out
									</div>
								</div>
							</div>

							<div v-else class="login-block">
								<div class="welcome">Hello, 
									<span class="amber-text">Guest!</span>
								</div>
								<div class="btn login" @click="show">Log In</div>
							</div>
						</li>

					</ul>

			</div>
		</nav>
	</div>
</template>



<script>
	import firebase from 'firebase'
	import alias from './alias/name.json'
	export default {
		name: 'Navbar',
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
					this.hide()
					M.toast({html: 'Logged In!'})
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
	.brand-logo.left {
		left: 0;
	}
	.logo {
		vertical-align: middle;
		margin: 0 1rem .3rem 0;
	}
	form {
		margin-left: auto;
		margin-right: auto;
	}
</style>





