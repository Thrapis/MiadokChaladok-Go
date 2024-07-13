package repository

import "gorm.io/gorm"

type Repository[T any] struct {
	DB *gorm.DB
}

func (r *Repository[T]) Create(entity *T) error {
	return r.DB.Create(entity).Error
}

func (r *Repository[T]) Update(entity *T) error {
	return r.DB.Save(entity).Error
}

func (r *Repository[T]) Delete(entity *T) error {
	return r.DB.Delete(entity).Error
}

func (r *Repository[T]) FindById(id uint) (entity *T, err error) {
	err = r.DB.Where("id = ?", id).Take(entity).Error
	return
}

func (r *Repository[T]) GetAll() (entities []T, err error) {
	err = r.DB.Find(&entities).Error
	return
}
