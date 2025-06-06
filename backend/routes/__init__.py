# Import each route module
from .predict import predict_bp
from .register import register_bp
from .login import login_bp
from .recent_prediction import recent_prediction_bp
from .forgot_password import forgot_bp

# Create a parent blueprint to register all child blueprints
def register_routes(app):
    app.register_blueprint(predict_bp)
    app.register_blueprint(register_bp)
    app.register_blueprint(recent_prediction_bp)
    app.register_blueprint(login_bp)
    app.register_blueprint(forgot_bp)