import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import './Avatar.scss';

const Avatar = ({ src, alt, name, size = "default", className = "" }) => {
  const initial = name ? name[0] : "";
  return src ? (
    <img
      src={src}
      alt={alt || "avatar"}
      className={classNames("avatar-img", `avatar-img--${size}`, className)}
    />
  ) : (
    <div className={classNames("avatar", `avatar--${size}`, className)}>
      {initial}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(["header", "sidebar", "settings", "default"]),
  className: PropTypes.string,
};

export default Avatar;