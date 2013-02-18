class ApplicationController < ActionController::Base
  protect_from_forgery
  
  def current_user                                                              
    super || guest_user
  end                                                                           

  def guest_user
    User.find(session[:guest_user_id].nil? ? session[:guest_user_id] = create_guest_user.id : session[:guest_user_id])
  end                                                                           

  def create_guest_user                                                         
    token = SecureRandom.base64(15)                                             
    user = User.new(:password => token, :email => "#{token}@example.com")
    user.save(:validate => false)
    user
  end
  
end