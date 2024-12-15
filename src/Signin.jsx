import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsKey } from "react-icons/bs";

const Signin = () => {
  const [formData, setFormData] = useState({ msv: "", password: "" });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  // Hàm xử lý khi submit form (để trống theo yêu cầu)
  const onFinish = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  // Hàm đóng form
  const onClose = () => {
    console.log("Form closed");
    // Bạn có thể chuyển hướng nếu cần, ví dụ:
    // navigate("/some-other-page");
  };

  return (
    <div className="signin-wrapper">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="position-relative" style={{ maxWidth: "400px", width: '100%' }}>
          {/* Close Button */}
          <button
            className="btn-close position-absolute top-0 end-0 m-2"
            onClick={onClose}
            aria-label="Close"
          ></button>

          {/* Card Container */}
          <div className="card shadow-lg p-4" style={{ borderRadius: "15px", backgroundColor: "#f5f5f5" }}>
            {/* Header */}
            <div className="text-center mb-4">
              <h3 className="fw-bold text-dark">Đăng nhập</h3>
            </div>

            {/* Error Alerts */}
            {!valid && (
              <div className="alert alert-danger">
                {errors.msv && <p className="mb-0">{errors.msv}</p>}
                {errors.password && <p className="mb-0">{errors.password}</p>}
              </div>
            )}

            {/* Form */}
            <form onSubmit={onFinish}>
              {/* MSV Input */}
              <div className="mb-3">
                <label className="form-label">
                  MSV <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaUserCircle />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập MSV"
                    value={formData.msv}
                    onChange={(e) => setFormData({ ...formData, msv: e.target.value })}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <label className="form-label">
                  Mật khẩu <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <BsKey />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 mt-3 fw-bold"
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
