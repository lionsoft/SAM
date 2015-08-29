using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection;

namespace Sam.Extensions.EntityFramework.EFHooks
{
    /// <summary>
    /// ���� ��� �� �������� ����������� �������������� ���������� ��� � ���� ������ � UTC ������� � 
    /// �������������� �� �������������� � ��������� ���� ��� ������.
    /// </summary>
    public class DateTimeUtcHook : IPreActionHook, IPostActionHook
    {
        #region IPreActionHook Members

        bool IPreActionHook.RequiresValidation
        {
            get { return true; }
        }

        #endregion

        #region IHook Members

        void IHook.HookObject(object entity, HookEntityMetadata metadata)
        {
            if (entity == null)
                return;

            List<PropertyInfo> changedProperties = null;
            if (metadata.Entry != null)
            {
                object res;
                if (metadata.Entry.Data.TryGetValue("DateTimeUtcPreActionHook_changedProperties", out res))
                {
                    changedProperties = (List<PropertyInfo>) res;
                }
                else
                {
                    changedProperties = new List<PropertyInfo>();    
                    metadata.Entry.Data["DateTimeUtcPreActionHook_changedProperties"] = changedProperties;
                }
            }

            var properties = metadata.HookType != HookType.Post 
                ? entity.GetType().GetProperties()
                    .Where(x => x.PropertyType == typeof(DateTime) || x.PropertyType == typeof(DateTime?))
                : changedProperties;

            if (properties != null)
            {
                foreach (var property in properties)
                {
                    var dt = property.PropertyType == typeof(DateTime?)
                        ? (DateTime?)property.GetValue(entity)
                        : (DateTime)property.GetValue(entity);

                    if (dt == null)
                        continue;

                    if (metadata.HookType == HookType.Pre)
                    {
                        if (dt.Value.Kind == DateTimeKind.Utc)
                        {
                            property.SetValue(entity, dt.Value.ToLocalTime());
                            if (changedProperties != null)
                            {
                                changedProperties.Add(property);
                            }
                        }
                    }
                }
            }
        }

        EntityState IHook.HookStates
        {
            get { return EntityState.Added | EntityState.Modified; }
        }

        #endregion
    }
    
}