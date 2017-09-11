class CreateSongs < ActiveRecord::Migration[5.1]
  def change
    create_table :songs do |t|
      t.string :name, null: false
      t.integer :rank, default: 0

      t.timestamps
    end
  end
end
