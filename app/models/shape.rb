class Shape < ActiveRecord::Base
  attr_accessible :color, :h, :uid, :w, :x, :y, :z, :t
  belongs_to :user
end
