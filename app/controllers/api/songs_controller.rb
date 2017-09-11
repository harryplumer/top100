class Api::SongsController < ApplicationController
  before_action :get_song, only: [:add_to_list, :remove_from_list, :uprank, :downrank, :update, :destroy]
  
  def index
    render json: Song.order('rank')
  end

  def create
    song = Song.new(song_params)
    if song.save
      render json: song
    else
      render_error(song) 
    end
  end

  def update
    if @song.update(song_params)
      render json: @song
    else
      render_error(@song)
    end
  end

  def add_to_list
    @song.update(rank: Song.all.maximum('rank')+1)
    render json: @song
  end

  def remove_from_list
    original_rank = @song.rank
    @song.update(rank: 0)
    @higher = Song.where("rank > ?", original_rank)
    @higher.each do |song|
      song.update(rank: song.rank-1)
    end
    render json: {song1: @song, top100: Song.where("rank != 0").order('rank')}
  end

  def uprank
    if @song.rank != 1
      @second_song = Song.where("rank = ?", @song.rank-1).first
      @second_song.update(rank: @song.rank)
      @song.update(rank: @song.rank-1)
    end
    render json: Song.where("rank != 0").order('rank')  
  end

  def downrank
    if @song.rank != Song.all.maximum('rank')
      @second_song = Song.where("rank = ?", @song.rank+1).first
      @second_song.update(rank: @song.rank)
      @song.update(rank: @song.rank+1)
    end
    render json: Song.where("rank != 0").order('rank')  
  end

  def destroy
    @song.destroy
  end

  private

  def song_params
    params.require(:song).permit(:title)
  end

  def get_song
    @song = Song.find(params[:id])
  end

  def render_error
    songs = song.errors.full_messages.join(",")
    render json: {errors: errors}, status: 418
  end

end
