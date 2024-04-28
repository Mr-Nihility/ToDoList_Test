import { MdOutlineAddBox } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { RouterPath } from "../../types/router.types";
import styles from "./NavigationLayout.module.scss";

function NavigationLayout() {
  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to={RouterPath.Home}
                className={({ isActive }) =>
                  isActive
                    ? styles.navLink + " " + styles.active
                    : styles.navLink
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={RouterPath.TodoList}
                className={({ isActive }) =>
                  isActive
                    ? styles.navLink + " " + styles.active
                    : styles.navLink
                }
              >
                Active cards
              </NavLink>
            </li>
            <li>
              <NavLink
                to={RouterPath.RemovedTodoList}
                className={({ isActive }) =>
                  isActive
                    ? styles.navLink + " " + styles.active
                    : styles.navLink
                }
              >
                Removed cards
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.addBtn} to={RouterPath.Add}>
                <MdOutlineAddBox size={50} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default NavigationLayout;
