# Output
This project allows users to add or update project details. It also enables monitoring the total number of projects along with their statuses, including in-progress, completed, and cancelled. Users can view the status distribution through graphical representations. The graphical format helps in easily visualizing the current state of all projects.
### Dashboard:
![dashboard](https://github.com/Rushikesh01Gaikwad/Jira-board-Angular/assets/136779452/0a71c625-9f9a-4541-95e8-330e7af726ae)

1. The total number of registered projects, along with their current statuses.
2. The first pie chart displays the distribution of project statuses graphically.
3. The second bar chart presents data by department, covering multiple departments such as Apps and Software, Data, DevOps, and Testing.
    1. The first blue bar represents the number of projects in the 'Apps and Software' department.
    2. The second orange bar shows the number of completed projects.
    3. The x-axis displays the percentage for each department.
    4. The percentages on the x-axis represent the proportion of projects within each department that are completed, calculated using a specific formula and presented as percentages.


### Project List: 
![Listing](https://github.com/Rushikesh01Gaikwad/Jeera/assets/136779452/f8560a38-422b-4634-b751-1a301d4bf363)
This is the Project Listing Page. 
This page includes several functionalities such as searching, sorting, filtering, and pagination.

1. Initially, it displays the complete list of projects from the JSON server.
2. Action buttons are provided for each project to allow editing and deleting.
3. The last column, "Change Status," allows you to update the status of each project.
4. Pagination is implemented at the bottom of the page to navigate through multiple project listings if there are many projects.


### Add Project:
![addproject](https://github.com/Rushikesh01Gaikwad/Jeera/assets/136779452/9f8440ab-87fe-4d9c-b410-e491502f4c36)

This is the Add Project Page. 
On this page, all necessary validations are in place, and some input fields have default values.

You need to enter only the project name, description, location, and department. 
Other input fields, such as date, time, and status, have default values and cannot be changed.
