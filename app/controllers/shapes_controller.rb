class ShapesController < ApplicationController
  respond_to :json
  
  def index
    respond_with Shape.where(:uid => current_user.id)
  end
  
  def show
    respond_with Shape.find(params[:id])
  end
  
  def create
    respond_with Shape.create(params[:shape])
  end
  
  def update
    respond_with Shape.update(params[:id], params[:shape])
  end
  
  def destroy
    respond_with Shape.destroy(params[:id])
  end
  
end
