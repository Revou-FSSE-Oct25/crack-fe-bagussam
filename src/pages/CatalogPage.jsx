import React from 'react';
import CourseCard from '../components/course/CourseCard';

const CatalogPage = ({ courses, onSelectCourse, getText }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map(course => (
        <CourseCard 
          key={course.id} 
          course={course} 
          onClick={onSelectCourse} 
          getText={getText} 
        />
      ))}
    </div>
  );
};

export default CatalogPage;