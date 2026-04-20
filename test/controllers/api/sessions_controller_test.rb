require "test_helper"

class Api::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
     post api_sessions_url, params: {
        email: users(:one).email,
        password: "password"
    }
    assert_response :success
  end
end
