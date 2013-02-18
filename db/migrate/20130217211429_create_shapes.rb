class CreateShapes < ActiveRecord::Migration
  def change
    create_table :shapes do |t|
      t.string :t
      t.integer :uid
      t.integer :x
      t.integer :y
      t.integer :z
      t.integer :w
      t.integer :h
      t.string :color

      t.timestamps
    end
  end
end
