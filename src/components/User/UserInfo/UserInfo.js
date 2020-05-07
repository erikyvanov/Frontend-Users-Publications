import React from "react";
import "./UserInfo.scss";
import moment from "moment";
import localization from "moment/locale/es";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

export default function UserInfo(props) {
  const { user } = props;
  return (
    <div className="user-info">
      {user?.description && (
        <div className="user-info__description">
          <p>{user.description}</p>
        </div>
      )}
      <div className="user-info__info">
        {user?.email && (
          <div className="user-info__info_data">
            <FontAwesomeIcon icon={faEnvelope} />
            <h4>{user.email}</h4>
          </div>
        )}
        {user?.location && (
          <div className="user-info__info_data">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <h4>{user.location}</h4>
          </div>
        )}
        {user?.birthday && (
          <div className="user-info__info_data">
            <FontAwesomeIcon icon={faCalendar} />
            <h4>
              {moment(user.birthday).locale("es", localization).format("LL")}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}
