# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

VITE_BASE_URL=http://localhost:8001

live url = https://swiftrut-task1-frontend.vercel.app/


admin email = mayur@gmail.com
password = Mayur@123


by default user roll = user
only one admin // can not register new admin for security

admin can see all the posts of the other users also can update status of task
on home page user can see all task given by admin and created by self

only admin have right to assign task to other users // there is function in admin route can
fetch other users while adding tasks

task will automatically arranged by its category (priority)
if task marks as done it automatically goes at down side of list

user can see which tasks are given by admin (by : @admin)
