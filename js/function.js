var siteurl = 'http://vantageappspro.com/lawbulls/site/appapi/';

function gup(sParam){
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

   for(i = 0; i < sURLVariables.length; i++){
        sParameterName = sURLVariables[i].split('=');

        if(sParameterName[0] === sParam){
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

// check if user login

function checkLogin(){	
	if(localStorage.getItem("login_id") == null) window.location = 'signin.html';
}

// log out
function logOut(){
	localStorage.removeItem('login_id');
	localStorage.removeItem('disp_name');	
	window.location = 'signin.html';
}

// redirect to forgot password

function goforgotPassword(){
	window.location = 'forgotpassword.html';
}

// redirect to login page
function gotoLogin(){
	window.location = 'signin.html';
}

// Account login

function loginMe(){
	var action_url = siteurl + 'account.php?pageacct=login';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: $('#account_login input[type=\'text\'], #account_login input[type=\'password\']'),
	 crossDomain: true,
	 success: function(data){		 
		$('.error').remove();
		 		 		 
	   	if(data['success'])
		{
			localStorage.setItem('login_id', data['success']['user_id']);
			localStorage.setItem('disp_name', data['success']['disp_name']);
			window.location = "home.html";
			
		}else if(data['error']){
			
			if(data['error']['login_id']){
				$('#login_id').after('<span class="error text-danger">' + data['error']['login_id'] + '</span>');
			}
			
			if(data['error']['login_password']){
				$('#login_password').after('<span class="error text-danger">' + data['error']['login_password'] + '</span>');
			}			
		}
	 }
   });
}

// Register account

function registerMe(){
	var action_url = siteurl + 'account.php?pageacct=register';
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: $('#account_register input[type=\'text\'], #account_register input[type=\'email\'], #account_register input[type=\'password\'], #account_register input[type=\'number\']'),
	 crossDomain: true,
	 success: function(data){
		 
		$('.error').remove();
		 		 		 
	   	if(data['success']){
			localStorage.setItem('login_id', data['success']['user_id']);
			localStorage.setItem('disp_name', data['success']['disp_name']);
			window.location = "home.html";
		}else if(data['error']){
			
			if(data['error']['first_name']){
				$('#first_name').after('<span class="error text-danger">' + data['error']['first_name'] + '</span>');
			}
			
			if(data['error']['last_name']){
				$('#last_name').after('<span class="error text-danger">' + data['error']['last_name'] + '</span>');
			}
			
			if(data['error']['user_mobile']){
				$('#user_mobile').after('<span class="error text-danger">' + data['error']['user_mobile'] + '</span>');
			}
			
			if(data['error']['user_email']){
				$('#user_email').after('<span class="error text-danger">' + data['error']['user_email'] + '</span>');
			}
			
			if(data['error']['user_password']){
				$('#user_password').after('<span class="error text-danger">' + data['error']['user_password'] + '</span>');
			}
		}
	 }
   });
}

// Forgot Password

function resetPassword(){
	var action_url = siteurl + 'account.php?pageacct=forgot';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: $('#forgot_password input[type=\'email\']'),
	 crossDomain: true,
	 success: function(data){
		 
		 $('.error').remove();
		 		 		 
	   	if(data['success'])
		{
			if(data['success']['message']){
				$('#forgot_email').val('');
				$('#forgot_email').after('<span class="error text-success">' + data['success']['message'] + '</span>');
			}
			
		}else if(data['error']){
			
			if(data['error']['forgot_email']){
				$('#forgot_email').after('<span class="error text-danger">' + data['error']['forgot_email'] + '</span>');
			}
		}
	 }
   });
}

function create_nav(){	
    var menu_links = '<div class="profile-info">';
    menu_links += '<img src="images/FakeDP.jpeg" alt="" /><span class="username">'+ localStorage.getItem("disp_name") +'</span>';
	menu_links += '</div>';
	menu_links += '<nav class="menu">';
	menu_links += '<div class="icon-list">';
	menu_links += '<a href="home.html"><img src="images/home.png" alt="Home" /><span>Home</span></a>';
	
if(localStorage.getItem("login_id") != null){
	menu_links += '<a href="casefinder.html"><img src="images/hammer_icon.png" alt="" /><span>Case finder <span class="casepro">Pro</span></span></a>';
 menu_links += '<a href="favouritescreen.html"><img src="images/favourite_icon.png" alt="" /><span>Favorites</span></a>';
 menu_links += '<a href="myorderscreen.html"><img src="images/order_icon.png" alt="" /><span>My Orders</span></a>';
 menu_links += '<a href="previous-orderscreen.html"><img src="images/order_icon2.png" alt="" /><span>Previous Orders</span></a>';
}
 
 menu_links += '<a href="feedbackscreen.html"><img src="images/feedback.png" alt="" /><span>Feedback</span></a>';
 menu_links += '<a href="#"><img src="images/terms_icon.png" alt="" /><span>Terms & conditions</span></a>';
 menu_links += '<a href="#"><img src="images/about_icon.png" alt="" /><span>About Us</span></a>';
 menu_links += '</div>';
 menu_links += '</nav>';
 menu_links += '<div class="menu-footer">';
 menu_links += '<div class="float-left"><a href="javascript:void(0);" onclick="logOut();">Sign Out</a></div>';
 menu_links += '<div class="float-right">';
 menu_links += '<ul class="menu-social">';
 menu_links += '<li><a href="#" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>';
 menu_links += '<li><a href="#" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>';
 menu_links += '<li><a href="#" target="_blank"><i class="fa fa-snapchat-ghost" aria-hidden="true"></i></a></li>';
 menu_links += '</ul>';
 menu_links += '</div>';
 menu_links += '</div>';
 menu_links += '<button class="close-button" id="close-button">Close Menu</button>'; 
 $('#nav_menu_list').html(menu_links);
}


// post detail

function postdetail(post_id){
	var action_url = siteurl + 'getcontent.php';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {post_id : post_id},
	 crossDomain: true,
	 success: function(data){	 		 		 
	   	if(data['content']){			
			$('#load_post').html(data['content']);
			$('#loader').remove();
		}		
	 }
   });
}

function shareposturl(post_url){	
	window.plugins.socialsharing.share(post_url);  	
}