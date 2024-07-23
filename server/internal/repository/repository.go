package repository

import "gorm.io/gorm"

type repository[T any] struct {
	db *gorm.DB
}

func (r *repository[T]) Create(entity *T) error {
	return r.db.Create(entity).Error
}

func (r *repository[T]) Update(entity *T) error {
	return r.db.Save(entity).Error
}

func (r *repository[T]) Delete(entity *T) error {
	return r.db.Delete(entity).Error
}

func (r *repository[T]) FindById(id uint) (entity *T, err error) {
	err = r.db.Where("id = ?", id).Take(entity).Error
	return
}

func (r *repository[T]) GetAll() (entities []T, err error) {
	err = r.db.Find(&entities).Error
	return
}
