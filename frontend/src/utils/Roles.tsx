import React from 'react';
import { authApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export const roleFunc = {
  getRole: async () => {
    const Role = await authApi
      .validateRole()
      .then((EC) => {
        console.log('Roles here: EC ', EC);
        console.log('Type of EC: ', typeof EC);
        switch (EC) {
          case 1:
            return 'admin';
          case 3:
            return 'student';
          case 2:
            return 'teacher';
          default:
            throw new Error('EC does not supported');
        }
      })
      .then((role) => {
        return role;
      });

    return Role;
  },
};
