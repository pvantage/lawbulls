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
	 data: $('#account_login input[type=\'text\'], #account_login input[type=\'password\'], #account_login input[type=\'hidden\']'),
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
	 data: $('#account_register input[type=\'text\'], #account_register input[type=\'email\'], #account_register input[type=\'password\'], #account_register input[type=\'number\'], #account_register input[type=\'hidden\']'),
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

// post detail

function postdetail(post_id){
	var action_url = siteurl + 'getcontent.php';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {post_id:post_id, getaction:'show_post'},
	 crossDomain: true,
	 success: function(data){	 		 		 
	   	if(data['content']){			
			$('#load_post').html(data['content']);
			$('.related_post').html(data['related']);
			$('#loader').remove();
		}		
	 }
   });
}

function shareposturl(post_url){	
	window.plugins.socialsharing.share(post_url);  	
}

// add favorite

function removeFav(post_id){
	var action_url = siteurl + 'getcontent.php';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {post_id:post_id, getaction: 'remove_fav', user_id: localStorage.getItem("login_id")},
	 crossDomain: true,
	 success: function(data){	 		 		 
	  
	  if(data['msg']){
		  
		$('#img-'+post_id).attr('src', 'images/favourite.png');
		$('#img-'+post_id).attr("onclick", 'addFav("'+post_id+'", "img-'+post_id+'")');     	
				
		$('#show_fav_message').html(data['msg']);		
		$('#show_fav_message').show();
		
		setTimeout(function(){ 
			$('#show_fav_message').hide();
		
		 }, 4000);
	  }
	 }
   });
}

// remove favorite

function addFav(post_id){
	var action_url = siteurl + 'getcontent.php';
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {post_id : post_id, getaction: 'add_fav', user_id: localStorage.getItem("login_id")},
	 crossDomain: true,
	 success: function(data){
	   if(data['msg']){
		 $('#img-'+post_id).attr('src', 'images/selected-favourite.png');
		 $('#img-'+post_id).attr("onclick", 'removeFav("'+post_id+'", "img-'+post_id+'")');		   			
		 $('#show_fav_message').html(data['msg']);		
		 $('#show_fav_message').show();
		
		setTimeout(function(){ 
			$('#show_fav_message').hide();		
		 }, 4000);		 
	   }		 
	 }
   });
}

// My Favorites posts

function my_favorite(){
	var action_url = siteurl + 'favorite.php';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {user_id:localStorage.getItem("login_id"), filter_action:'favorite'},
	 crossDomain: true,
	 success: function(data){  
	  	if(data['content']){
			$('#favorite').html(data['content']);
			$('#loader').remove();	
		}
	 }
   });
}


// REMOVE Favorite posts

function removefavList(post_id){
	var action_url = siteurl + 'favorite.php';	
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {user_id:localStorage.getItem("login_id"),post_id:post_id, filter_action:'delete_fav'},
	 crossDomain: true,
	 success: function(data){  
	  	if(data['post_id']){
			$('#fav_post_'+data['post_id']).remove();				
		}
	 }
   });
}

// GET Case Plan & case category

function getPlans(post_id){
	var action_url = siteurl + 'case_finders.php';
	
	var plan_name = '';
	var case_type = '';
	
	if(localStorage.getItem("pname") != null){
		plan_name = localStorage.getItem("pname");
	}
	
	if(localStorage.getItem("ctype") != null){
		case_type = localStorage.getItem("ctype");
	}
	
		
	$.ajax({
	 type: 'POST',
	 url: action_url,
	 dataType: 'json',
	 data: {user_id:localStorage.getItem("login_id"),post_action:'case_category', pname:plan_name, case_type:case_type},
	 crossDomain: true,
	 success: function(data){  
	  	if(data['case_category']){
			$('#case_type').html(data['case_category']);				
		}
		
		if(data['case_plan']){
			$('#case_plan').html(data['case_plan']);				
		}
	 }
   });
}

// check trans id
function checkTrans(){	
	if(localStorage.getItem("trnx_id") == null) window.location = 'casefinder.html';
}


$(function(){
    var url = window.location.pathname, 
        urlRegExp = new RegExp(url.replace(/\/$/,'') + "$");
        $('.menu a').each(function(){            
            if(urlRegExp.test(this.href.replace(/\/$/,''))){
                $(this).addClass('active');
            }
        });

});

function getLoginname(){	
		$('.username').html(localStorage.getItem("disp_name"));	
}

function getProfileimg(){	
	$.ajax({
	 type: 'POST',
	 url: action_url+'account.php?pageacct=getImg',
	 dataType: 'json',
	 data: {user_id:localStorage.getItem("login_id")},
	 crossDomain: true,
	 success: function(data){  
	  	if(data['img']){
			$('#profile_img').attr('src', data['img']);			
		}
	 }
   });
}