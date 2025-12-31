class CommentsController < ApplicationController
 before_action :authenticate_user!

    def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      redirect_to @post, notice: "コメントが保存されました"
    else
      render "posts/show", status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    post = @comment.post
    @comment.destroy
    redirect_to post, notice: "コメントを削除しました"
  end


  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
